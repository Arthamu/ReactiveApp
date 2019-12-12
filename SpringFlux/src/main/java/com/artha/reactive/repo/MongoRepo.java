package com.artha.reactive.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.artha.reactive.entity.Resturants;

import reactor.core.publisher.Flux;

public interface MongoRepo extends ReactiveCrudRepository<Resturants, String> {
	 
	 @Query("{ id: { $exists: true }}")
    Flux<Resturants> retrieveAllResturantsPaged(final Pageable page);
}