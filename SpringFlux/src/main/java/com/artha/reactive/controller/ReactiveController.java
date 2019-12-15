package com.artha.reactive.controller;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.artha.reactive.entity.Resturants;
import com.artha.reactive.repo.MongoRepo;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*")
public class ReactiveController {
	@Autowired
	MongoRepo repo;

	long DELAY_PER_ITEM_MS = 1;
	
	  @GetMapping("/getAll") Flux<Resturants> getAll(){
	  System.out.println("here");
	  return repo.findAll().delayElements(Duration.ofMillis(DELAY_PER_ITEM_MS)); }
	 

	@GetMapping("/getAllPaged")
	public Flux<Resturants> getQuoteFlux(final @RequestParam(name = "page") int page,
			final @RequestParam(name = "size") int size) {
		return repo.retrieveAllResturantsPaged(PageRequest.of(page, size))
				.delayElements(Duration.ofMillis(DELAY_PER_ITEM_MS));
	}
	@GetMapping("/SizeOfList")
	public Mono<Long> getQuoteFlux() {
		return repo.count();
	}


	/*
	 * @GetMapping("/getAll") String getAll() throws JsonMappingException,
	 * JsonProcessingException{
	 * 
	 * String
	 * json="[{\"url\":\"https://picsum.photos/600\",\"id\":\"dkkdkdkd\",\"address\":\"228 City Road\",\"address line 2\":\"Cardiff\",\"name\":\".CN Chinese\",\"outcode\":\"CF24\",\"postcode\":\"3JH\",\"rating\":5,\"type_of_food\":\"Chinese\"}]"
	 * ;
	 * 
	 * 
	 * return json; }
	 */
}
