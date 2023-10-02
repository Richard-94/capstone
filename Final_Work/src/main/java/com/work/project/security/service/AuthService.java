package com.work.project.security.service;



import com.work.project.security.payload.LoginDto;
import com.work.project.security.payload.RegisterDto;
import com.work.project.security.payload.RegisterResponse;


public interface AuthService {
String login(LoginDto loginDto);

    RegisterResponse register(RegisterDto registerDto);

}
