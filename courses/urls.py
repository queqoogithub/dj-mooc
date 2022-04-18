from courses.views import AddComment, CourseDetail, CourseStudy, CoursesHomeViews, GetCartDetail, SearchCourse, SectorCourse
from django.urls import path

app_name='courses'

urlpatterns = [
  path("study/<uuid:course_uuid>/",CourseStudy.as_view()),
  path('cart/', GetCartDetail.as_view()),
  path('comment/<uuid:course_uuid>/', AddComment.as_view()),
  path('search/<str:search_term>/', SearchCourse.as_view()),
  path('<uuid:sector_uuid>/', SectorCourse.as_view()),
  path('detail/<uuid:course_uuid>/', CourseDetail.as_view()),
  path('', CoursesHomeViews.as_view(),),
]