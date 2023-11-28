package www.dream.bbs.shelter.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PlaceVO {
	private String name;
	private double placeLat;
	private double placeLng;
	
	public PlaceVO(String name, double placeLat, double placeLng) {
		this.name = name;
		this.placeLat = placeLat;
		this.placeLng = placeLng; 
	}

}
