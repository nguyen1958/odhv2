package fr.analogon.entities;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import fr.analogon.utils.Utils;

@Entity
@Table(name = "odh_immeubles", uniqueConstraints = @UniqueConstraint(columnNames = {
		"odim_cadsct", "odim_cadp1" }))
@NoArgsConstructor @Getter @Setter
public class OdhImmeubles implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odim_id", unique = true, nullable = false)
	private Integer odimId;
	@Column(name = "odim_cadsct", length = 2)
	private String odimCadsct;
	@Column(name = "odim_cadp1", length = 4)
	private String odimCadp1;
	@Column(name = "odim_cadp2", length = 4)
	private String odimCadp2;
	@Column(name = "odim_cadp3", length = 4)
	private String odimCadp3;
	@Column(name = "odim_cadp4", length = 4)
	private String odimCadp4;
	@Column(name = "odim_ilsct", length = 2)
	private String odimIlsct;
	@Column(name = "odim_ililot", length = 3)
	private String odimIlilot;
	@Column(name = "odim_ilbat", length = 2)
	private String odimIlbat;
	@Temporal(TemporalType.DATE)
	@Column(name = "odim_datecrea", length = 10)
	private Date odimDatecrea;
	@Column(name = "odim_quartier")
	private Integer odimQuartier;
	@Column(name = "odim_groupe")
	private Integer odimGroupe;
	@Column(name = "odim_nom", nullable = false, length = 60)
	private String odimNom;
	@Column(name = "odim_type")
	private Integer odimType;
	@Column(name = "odim_desc", length = 250)
	private String odimDesc;
	@Column(name = "odim_num", length = 10)
	private String odimNum;
	@Column(name = "odim_rue", nullable = false)
	private Integer odimRue;
	@Column(name = "odim_canton", length = 2)
	private String odimCanton;
	@Column(name = "odim_position", length = 8)
	private String odimPosition;
	@Column(name = "odim_alignement", length = 15)
	private String odimAlignement;
	@Column(name = "odim_nbap")
	private Integer odimNbap;
	@Column(name = "odim_niv")
	private Integer odimNiv;
	@Column(name = "odim_haut", precision = 5)
	private Double odimHaut;
	@Column(name = "odim_surfacesol", precision = 10)
	private Double odimSurfacesol;
	@Column(name = "odim_surfacetot", precision = 10)
	private Double odimSurfacetot;
	@Column(name = "odim_etgen")
	private Integer odimEtgen;
	@Column(name = "odim_ncaves")
	private Integer odimNcaves;
	@Column(name = "odim_parking")
	private Integer odimParking;
	@Column(name = "odim_grenier")
	private Boolean odimGrenier;
	@Column(name = "odim_locpoub")
	private Boolean odimLocpoub;
	@Column(name = "odim_ascenseur")
	private Integer odimAscenseur;
	@Column(name = "odim_partscomscom")
	private String odimPartscomscom;
	@Column(name = "odim_chauffage")
	private Boolean odimChauffage;
	@Column(name = "odim_gaz")
	private Boolean odimGaz;
	@Column(name = "odim_eau")
	private Boolean odimEau;
	@Column(name = "odim_terjeux")
	private Boolean odimTerjeux;
	@Column(name = "odim_pelouse")
	private Boolean odimPelouse;
	@Column(name = "odim_enventr")
	private Boolean odimEnventr;
	@Column(name = "odim_envcomment")
	private String odimEnvcomment;
	@Column(name = "odim_syndic")
	private Integer odimSyndic;

	//Ces getteurs permettent de convertir de boolean en string 
	//car les options de la balise radio n'accepte que le string ou int
	public String getOdimGrenier(){
		return Utils.boolToString(this.odimGrenier);
	}
	public String getOdimLocpoub(){
		return Utils.boolToString(this.odimLocpoub);
	}
	public String getOdimChauffage(){
		return Utils.boolToString(this.odimChauffage);
	}
	public String getOdimGaz(){
		return Utils.boolToString(this.odimGaz);
	}
	public String getOdimEau(){
		return Utils.boolToString(this.odimEau);
	}
	public String getOdimTerjeux(){
		return Utils.boolToString(this.odimTerjeux);
	}
	public String getOdimPelouse(){
		return Utils.boolToString(this.odimPelouse);
	}
	public String getOdimEnventr(){
		return Utils.boolToString(this.odimEnventr);
	}

	//Solution pour date
	//public String getOdimDatecrea(Date date){
	//	return Utils.dateToString(this.odimDatecrea);
	//}
	//Convertir au type Date la date reçu au format string
	public void SetOdimDatecrea(String date){
		this.odimDatecrea=Utils.stringToDate(date);
	}
}

