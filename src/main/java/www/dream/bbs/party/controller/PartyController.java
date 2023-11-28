package www.dream.bbs.party.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import www.dream.bbs.party.model.OrganizationVO;
import www.dream.bbs.party.model.PersonVO;
import www.dream.bbs.party.service.PartyService;

@RestController		//Container에 담기도록 지정
@CrossOrigin
@RequestMapping("/party")
public class PartyController {
	@Autowired
	private PartyService partyService;
	
	// /party/anonymous/listAllMember?ownerId=0000
	@GetMapping("/anonymous/listAllMember")
	//@PreAuthorize("hasAnyRole('manager')")
	public ResponseEntity<List<PersonVO>> listAllMember(/* @RequestParam("ownerId") */ String ownerId) {
		return ResponseEntity.ok(partyService.listAllMember(ownerId));
	}

	@PostMapping("/createOrganization")
	public ResponseEntity<Integer> createOrganization(OrganizationVO organization) {
		return ResponseEntity.ok(partyService.createOrganization(organization));
	}

	@PostMapping("/createManager")
	public ResponseEntity<Integer> createManager(OrganizationVO organization, PersonVO person) {
		return ResponseEntity.ok(partyService.createManager(organization, person));
	}

	// /party/anonymous/checkNick?nick=hgghg
	@GetMapping("/anonymous/checkNick")
	public ResponseEntity<Boolean> checkNick(String nick) {
		return ResponseEntity.ok(partyService.checkNick(nick));
	}

	// /party/anonymous/createMember
	@PostMapping("/anonymous/createMember")
	public ResponseEntity<Integer> createMember(@RequestBody PersonVO person) {
		return ResponseEntity.ok(partyService.createMember(person));
	}
}
