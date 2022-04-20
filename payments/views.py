from decimal import Decimal
from django.core.exceptions import ValidationError
from django.shortcuts import render
from rest_framework.views import APIView
import stripe
# from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
import os
import json

from courses.models import Course
from payments.models import Payment, PaymentIntent
from users.models import User
from rest_framework.permissions import IsAuthenticated

#stripe_api_key=os.environ.get("STRIPE_SECRET_KEY")
stripe.api_key=settings.STRIPE_APIKEY
print('Stripe ===> ', stripe.api_key)
#endpoint_secret=os.environ.get("WEBHOOK_SECRET")
endpoint_secret=settings.WEBHOOK_SECRET
#stripe.api_key=stripe_api_key

class PaymentHandler(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        if request.body:
            body=json.loads(request.body)
            if body and len(body):
                # fetch course detail as line_items
                courses_line_items=[]
                cart_course=[]
                for item in body:
                    try:
                        course=Course.objects.get(course_uuid=item)
                        line_item={
                            'price_data': {
                                'currency': 'usd',
                                'unit_amount': int(course.price*100),
                                'product_data': {
                                    'name': course.title,
                                },
                            },
                            'quantity': 1,
                        }
                        courses_line_items.append(line_item)
                        cart_course.append(course)

                    except Course.DoesNotExist:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                    except ValidationError:
                        pass
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        checkout_session=stripe.checkout.Session.create(
          payment_method_types=["card"],
          line_items=courses_line_items,
          mode="payment",
          success_url="http://localhost:3000/",
          cancel_url="http://localhost:3000/"
        )

        intent=PaymentIntent.objects.create(
          payment_intent_id=checkout_session.payment_intent,
          checkout_id=checkout_session.id,
          #user=User.objects.get(id=1)
          user=request.user,
        )

        intent.course.add(*cart_course)

        return Response({"url":checkout_session.url})

class Webhook(APIView):

    def post(self,request,*args, **kwargs):
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None

        try:
            event = stripe.Webhook.construct_event(
              payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            # Invalid payload
            return Response(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return Response(status=400)


        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            
            try:
                # fetch user intent
                intent=PaymentIntent.objects.get(
                    payment_intent_id=session.payment_intent,
                    checkout_id=session.id
                    
                )
            except PaymentIntent.DoesNotExist:
                return Response(status=400)
            
            # create payment reciept
            Payment.objects.create(
                payment_intent=intent,
                total_amount= Decimal(session.amount_total/100),
            )

            for course in intent.course.all():
            # TODO add course to user profile
                intent.user.paid_course.add(course)

    # Fulfill the purchase...
    # fulfill_order(session)

  # Passed signature verification
        return Response(status=200)
        

          