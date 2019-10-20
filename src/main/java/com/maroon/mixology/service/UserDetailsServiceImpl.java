package com.maroon.mixology.service;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

import com.maroon.mixology.entity.User;
import com.maroon.mixology.entity.Role;
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
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : user.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        }
        List<GrantedAuthority> authorityList = new ArrayList<>(authorities);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorityList);
    }

}