package com.maroon.mixology.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.maroon.mixology.entity.Role;
import com.maroon.mixology.entity.User;
import com.maroon.mixology.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (!userRepository.existsByEmail(email)) {
            throw new UsernameNotFoundException("User not found");
        }
        else{
            User user = userRepository.findByEmail(email);
            Set<GrantedAuthority> authorities = new HashSet<>();
            for (Role role : user.getRoles()){
                authorities.add(new SimpleGrantedAuthority(role.getRole())); //Role ENUM must turn to string for Spring Security
            }
            List<GrantedAuthority> authorityList = new ArrayList<>(authorities);
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorityList);
        }
        
    }

}