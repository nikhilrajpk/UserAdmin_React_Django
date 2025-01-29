from django.shortcuts import render
from rest_framework import serializers, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

# User serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_profile = serializers.ImageField(required=False)
    phone = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'phone', 'address', 'password', 'first_name', 'last_name',
                  'is_active', 'is_staff', 'user_profile']
        
    def create(self, validated_data):
        password = validated_data.pop('password') 
        user = get_user_model().objects.create(**validated_data)
        user.set_password(password)
        user.is_active = True
        user.save()
        return user
    
# To retrieve userdata.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    
# User Registration View
class RegisterUserView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
# User Login View
class LoginUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            userDetails = CustomUser.objects.get(username = user.username)
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "email": user.email,
                "userDetails" : UserSerializer(userDetails).data
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


