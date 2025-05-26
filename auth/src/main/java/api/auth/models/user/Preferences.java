package api.auth.models.user;

import lombok.Data;

@Data
public class Preferences {

	private Language language = Language.ENGLISH;

}

enum Language {

	ENGLISH, SPANISH

}
