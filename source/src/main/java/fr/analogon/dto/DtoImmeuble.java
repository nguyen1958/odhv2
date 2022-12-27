package fr.analogon.dto;

import fr.analogon.entities.OdhEtatpar;
import fr.analogon.entities.OdhImmeubles;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @Getter @Setter
public class DtoImmeuble {
    private OdhImmeubles immeuble;
    private OdhEtatpar sanitaire;
}
