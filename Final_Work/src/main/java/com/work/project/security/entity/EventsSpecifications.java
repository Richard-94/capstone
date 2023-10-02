package com.work.project.security.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.work.project.security.model.Events;

import jakarta.persistence.criteria.Predicate;

public class EventsSpecifications {
    public static Specification<Events> searchByCriteria(
            String town, String region, String eventType) {
        return (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Aggiungi le condizioni di ricerca dinamiche in base ai parametri forniti
            if (town != null && !town.isEmpty()) {
                predicates.add(builder.equal(root.get("town"), town));
            }

            if (region != null && !region.isEmpty()) {
                predicates.add(builder.equal(root.get("region"), region));
            }

          
            if (eventType != null && !eventType.isEmpty()) {
                predicates.add(builder.equal(root.get("eventType"), eventType));
            }

            // Combina le condizioni con un'AND
            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}


