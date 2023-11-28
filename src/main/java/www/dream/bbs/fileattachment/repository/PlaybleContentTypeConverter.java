package www.dream.bbs.fileattachment.repository;

import java.util.stream.Stream;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import www.dream.bbs.fileattachment.model.PlaybleContentTypes;

@Converter(autoApply = true)
public class PlaybleContentTypeConverter implements AttributeConverter<PlaybleContentTypes, String> {
	@Override
	public String convertToDatabaseColumn(PlaybleContentTypes playbleContentType) {
		if (playbleContentType == null) {
			return null;
		}
		return playbleContentType.toString();
	}

	@Override
	public PlaybleContentTypes convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(PlaybleContentTypes.values()).filter(c -> c.toString().equals(code)).findFirst()
				.orElseThrow(IllegalArgumentException::new);
	}
}
