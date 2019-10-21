package com.maroon.mixology.service;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  
  private JavaMailSender mailSender;
  
  @Autowired
  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }
  
  @Async
  public void sendEmail(SimpleMailMessage email) {
    mailSender.send(email);
  }
  
}