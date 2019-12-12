package com.artha.reactive.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "restaurants")
public class Resturants {
	
	private String URL;
private String id;
private String address;
private String addressLine2;
private String name;
private String outcode;
private String postcode;
private String rating;

}
