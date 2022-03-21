from courses.views import CoursesHomeViews
from django.urls import path

app_name='courses'

urlpatterns = [
  path('', CoursesHomeViews.as_view(),),
]