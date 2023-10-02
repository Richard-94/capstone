package com.work.project.security.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.work.project.security.checking.EventsControl;
import com.work.project.security.entity.ERole;
import com.work.project.security.entity.Role;
import com.work.project.security.entity.User;
import com.work.project.security.payload.LoginDto;
import com.work.project.security.payload.RegisterDto;
import com.work.project.security.payload.RegisterResponse;
import com.work.project.security.repository.RoleRepository;
import com.work.project.security.repository.UserRepository;
import com.work.project.security.security.JwtTokenProvider;

import jakarta.persistence.EntityNotFoundException;





@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    @Autowired  EventsControl eventControl;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {

    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
	public RegisterResponse register(RegisterDto registerDto) {

    	eventControl.registerAndCheck(registerDto);
        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        //user.setDate(LocalDateTime.now());
        //user.setSecretCode(registerDto.getSecretCode());
        //user.setCreditCard(registerDto.getCreditCard());
       user.setAddress(registerDto.getAddress());
       user.setAvatar(registerDto.getAvatar());
       user.setTelephone(registerDto.getTelephone());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();

        if(registerDto.getRoles() != null) {
	        registerDto.getRoles().forEach(role -> {
	        	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	        	roles.add(userRole);
	        });
        } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
        	roles.add(userRole);
        }

        user.setRoles(roles);
        System.out.println(user);
        userRepository.save(user);

        return new RegisterResponse(
				registerDto.getName(),
				registerDto.getUsername(),
				registerDto.getEmail(),
				"User registered successfully!.");
    }

    public ERole getRole(String role) {
    	if(role.equals("ADMIN")) return ERole.ROLE_ADMIN;
    	else if(role.equals("MODERATOR")) return ERole.ROLE_MODERATOR;
    	else return ERole.ROLE_USER;
    }

    public User findUserWithCreatedEventsByUsername(String username) {
        Optional<User> userWithCreatedEvents = userRepository.findUserWithCreatedEventsByUsername(username);

        return userWithCreatedEvents.orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
    }

}
