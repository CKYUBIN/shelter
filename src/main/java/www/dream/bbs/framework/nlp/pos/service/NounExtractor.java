package www.dream.bbs.framework.nlp.pos.service;

import java.util.List;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;

public class NounExtractor {
	private static Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
	
	public static List<String> extracteNoun(String document) {
		KomoranResult analyzeResultList = komoran.analyze(document);
		List<String> nounList = analyzeResultList.getNouns();
		return nounList;
	}

	public static void main(String[] args) {
		//Komoran은 영문장에 대한.. 약함이... SL로만 한 덩치로 보임
		String data = "Starting a home-based restaurant may be an ideal. it doesn't have a food chain or restaurant of their own.";
		List<String> list = extracteNoun(data);
		for (String v : list)
			System.out.println(v);
	}
}
