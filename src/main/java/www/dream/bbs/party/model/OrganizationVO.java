package www.dream.bbs.party.model;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class OrganizationVO extends PartyVO {
	public OrganizationVO(String name, String nick, String pwd, List<ContactPointVO> listContactPoint) {
		super(name, nick, pwd, listContactPoint);
	}
}
