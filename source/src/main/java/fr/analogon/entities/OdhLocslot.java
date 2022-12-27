package fr.analogon.entities;

// Generated 6 oct. 2022 18:44:28 by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * OdhLocslot generated by hbm2java
 */
@Entity
@Table(name = "odh_locslot")
@NoArgsConstructor	@Getter	@Setter
public class OdhLocslot implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odll_id", unique = true, nullable = false)
	private Integer odllId;
	@Column(name = "odll_lot", nullable = false)
	private int odllLot;
	@Column(name = "odll_locataire", nullable = false)
	private int odllLocataire;
	@Temporal(TemporalType.DATE)
	@Column(name = "odll_datede", nullable = false, length = 10)
	private Date odllDatede;
	@Temporal(TemporalType.DATE)
	@Column(name = "odll_datea", length = 10)
	private Date odllDatea;
	@Column(name = "odll_observations", length = 65535)
	private String odllObservations;
	@Override
	public String toString() {
		return "OdhLocslot [odllId=" + odllId + ", odllLot=" + odllLot + ", odllLocataire=" + odllLocataire
				+ ", odllDatede=" + odllDatede + ", odllDatea=" + odllDatea + ", odllObservations=" + odllObservations
				+ "]";
	}
	
}