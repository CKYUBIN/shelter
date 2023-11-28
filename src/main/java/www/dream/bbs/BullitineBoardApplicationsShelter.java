package www.dream.bbs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import www.dream.bbs.webclient.WebClient4Shelter;
import www.dream.bbs.webclient.WebClient4Shelter2;
import www.dream.bbs.webclient.WebClient4Shelter3;

@SpringBootApplication
@EnableScheduling
@Configuration
public class BullitineBoardApplicationsShelter extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(BullitineBoardApplicationsShelter.class);
	}


	@Autowired
	private WebClient4Shelter webClient4Shelter;
	 @Scheduled(fixedRate=6000000)
	public void work() {
		webClient4Shelter.loadShelter();
	}

	@Autowired
	private WebClient4Shelter2 webClient4Shelter2;
	 @Scheduled(fixedRate=6000000)
	public void work2() {
		webClient4Shelter2.loadShelter();
	}

	@Autowired
	private WebClient4Shelter3 webClient4Shelter3;
	 @Scheduled(fixedRate=6000000)
	public void work3() {
		webClient4Shelter3.loadShelter();

	}

	public static void main(String[] args) {
		SpringApplication.run(BullitineBoardApplicationsShelter.class, args);
	}
}
