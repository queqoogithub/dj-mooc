from rest_framework import serializers
from users.serializers import UserSerializer
from courses.models import Course
from rest_framework.serializers import ModelSerializer

class CourseDisplaySerializer(ModelSerializer):
    #rating=serializers.IntegerField(source='get_rating')
    student_no=serializers.IntegerField(source='get_enrolled_students')
    author=UserSerializer()

    class Meta:
        model=Course
        fields=['course_uuid',"title",'student_no',"author","price","image_url"]