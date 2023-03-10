package fr.analogon.entities;

// Generated 6 oct. 2022 18:44:28 by Hibernate Tools 3.4.0.CR1

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

/**
 * OdhEntreprises generated by hbm2java
 */
@Entity
@Table(name = "odh_entreprises", uniqueConstraints = {
		@UniqueConstraint(columnNames = "oden_nom"),
		@UniqueConstraint(columnNames = "oden_code") })
@NoArgsConstructor	@Getter	@Setter
public class OdhEntreprises implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "oden_id", unique = true, nullable = false)
	private Integer odenId;
	@Column(name = "oden_type")
	private Integer odenType;
	@Column(name = "oden_code", unique = true, nullable = false, length = 4)
	private String odenCode;
	@Column(name = "oden_nom", unique = true, nullable = false, length = 60)
	private String odenNom;
	@Column(name = "oden_addr1", length = 60)
	private String odenAddr1;
	@Column(name = "oden_addr2", length = 60)
	private String odenAddr2;
	@Column(name = "oden_codeposte")
	private Integer odenCodeposte;
	@Column(name = "oden_ville", length = 30)
	private String odenVille;
	@Column(name = "oden_tel", length = 20)
	private String odenTel;
	@Column(name = "oden_fax", length = 20)
	private String odenFax;
	@Column(name = "oden_mail", length = 60)
	private String odenMail;
	@Column(name = "oden_comment", length = 65535)
	private String odenComment;
}
