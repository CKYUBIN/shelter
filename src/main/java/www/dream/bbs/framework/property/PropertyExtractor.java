package www.dream.bbs.framework.property;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import www.dream.bbs.framework.property.anno.TargetProperty;

public class PropertyExtractor {
	/**
	 * 해당 class에서 정의한 모든 속성을 상속 구조까지 추적하면서 추출. 
	 * @param cls
	 * @return
	 */
	private static List<Field> collectAllField(Class<?> cls) {
		List<Field> ret = new ArrayList<>();
		do {
			Arrays.stream(cls.getDeclaredFields()).forEach(f->ret.add(f));
			cls = cls.getSuperclass();
		} while(cls != Object.class);
		return ret;
	}

	/**
	 * String 속성 중 @TargetProperty이 달린 값을 추출. Associated 속성까지 재귀적 탐색
	 * @param obj
	 * @param ret
	 * @throws Exception
	 */
	private static void extractProperty(Object obj, List<String> ret) throws Exception {
		if (obj == null)
			return;
		List<Field> fields =  collectAllField(obj.getClass());
		for (Field field : fields) {
			TargetProperty dis = field.getAnnotation(TargetProperty.class);
			if (dis != null) {
				field.setAccessible(true);
				if (field.getType() == String.class) {
					ret.add((String) field.get(obj));
				} else {
					extractProperty(field.get(obj), ret);
				}
			}
		}
	}

	/**
	 * 재귀 호출 준비 단계
	 * @param obj
	 * @return
	 */
	public static List<String> extractProperty(Object obj) {
		List<String> ret = new ArrayList<>();
		try {
			extractProperty(obj, ret);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}
	/*
	public static void main(String[] args) {
		PostVO tgt = new PostVO();
		tgt.setTitle("nutrfyhdrll");
		tgt.setContent("ccc null");
		MemberVO writer = new MemberVO("길동이", true);
		tgt.setWriter(writer);
		
		List<String> rrr = extractProperty(tgt);
		for (String s : rrr)
			System.out.println(s);
	}
	*/
}
