package fr.analogon.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "odh_rues", uniqueConstraints = @UniqueConstraint(columnNames = "odrue_code"))
@NoArgsConstructor @Getter @Setter
public class OdhRues implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odrue_id")
	private Integer odrueId;
	@Column(name = "odrue_code", unique = true)
	private Integer odrueCode;
	@Column(name = "odrue_type", nullable = false, length = 20)
	private String odrueType="";
	@Column(name = "odrue_liaison", nullable = false, length = 30)
	private String odrueLiaison="";
	@Column(name = "odrue_nom", nullable = false, length = 60)
	private String odrueNom="";
	@Column(name = "odrue_nomrech", nullable = false, length = 60)
	private String odrueNomrech="";
	@Column(name = "odrue_ville", nullable = false, length = 30)
	private String odrueVille="";
	@Column(name = "odrue_codeposte", nullable = false)
	private int odrueCodeposte;

}

