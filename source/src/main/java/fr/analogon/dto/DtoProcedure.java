package fr.analogon.dto;

import fr.analogon.entities.OdhProceduresimr;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor  @Getter @Setter @ToString
public class DtoProcedure {
    private OdhProceduresimr procedure;
    private Integer[] naturedest;
    private Integer[] expertdest;
}
