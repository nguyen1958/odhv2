package fr.analogon.dto;

import fr.analogon.entities.OdhLots;
import fr.analogon.entities.OdhEtatpar;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @Getter @Setter
public class DtoLot {
    private OdhLots lot;
    private OdhEtatpar sanitaire;
}
