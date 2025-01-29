from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, RegisterUserView, LoginUserView, UpdateUserView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterUserView.as_view(), name='register'),
    path('api/login/', LoginUserView.as_view(), name='login'),
    path('api/update-profile/<int:pk>/', UpdateUserView.as_view(), name='update-profile')
]