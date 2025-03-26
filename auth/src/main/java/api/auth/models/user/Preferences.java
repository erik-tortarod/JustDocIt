package api.auth.models.user;

import lombok.Data;

@Data
public class Preferences {

    private Theme theme = Theme.SYSTEM;
    private Language language = Language.ENGLISH;

}

enum Language{
    ENGLISH, SPANISH
}

enum Theme{
    LIGHT,DARK,SYSTEM
}