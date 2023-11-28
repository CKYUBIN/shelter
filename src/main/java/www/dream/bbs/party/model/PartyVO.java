package www.dream.bbs.party.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import www.dream.bbs.framework.model.MasterEntity;
import www.dream.bbs.framework.property.anno.TargetProperty;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PartyVO extends MasterEntity implements UserDetails {
	@TargetProperty
	private String name;
	@TargetProperty
	private String nick;
	//@JsonIgnore	//pwd는 화면에 노출하는 대상이 아님! 보안!
	private String pwd;

	//연락처 목록
	private List<ContactPointVO> listContactPoint = new ArrayList<>();
	private List<AccountabilityVO> listAccountability = new ArrayList<>();

	public PartyVO(String name, String nick, String pwd, List<ContactPointVO> listContactPoint) {
		this.name = name;
		this.nick = nick;
		this.pwd = pwd;
		this.listContactPoint = listContactPoint;
	}
	
	public void addCP(ContactPointVO cp) {
		listContactPoint.add(cp);
	}

	public void addAccountability(AccountabilityVO o) {
		listAccountability.add(o);
	}
	
	public void encodePwd(PasswordEncoder pwdEnc) {
		pwd = pwdEnc.encode(pwd);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		/*
		List<SimpleGrantedAuthority> ret = new ArrayList<>();
		for (AccountabilityVO acc : listAccountability) {
			ret.add(acc.getAuthority());
		}
		return ret;
		 */
		return listAccountability
				.stream()	//하나씩 빨대로 뽑아 내어
				.map(AccountabilityVO::getAuthority)	//getAuthority 함수로 만든 결과로 map(변환하여)
				.collect(Collectors.toList());	//모을것이야
	}

	@Override
	public String getPassword() {
		return pwd;
	}

	@Override
	public String getUsername() {
		return nick;
	}

	@Override
	public boolean isAccountNonExpired() {
		return listAccountability.stream()
				.filter(AccountabilityVO::isAlive).count() > 0; 
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
