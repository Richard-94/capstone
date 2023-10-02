package com.work.project.security.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.work.project.security.codes.CreditCardConverter;
import com.work.project.security.codes.SecretCodeConverter;
import com.work.project.security.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Bancomat {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	   private LocalDateTime date; // data di registrazione
	    @Column(nullable = false, unique = true)
	    @Convert(converter = SecretCodeConverter.class)
	    private String secretCode;
	    @Convert(converter = CreditCardConverter.class)
	    private String creditCard;
	    @Column(nullable = false)
	    private LocalDate expDate;
	    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	    private User user;
}
