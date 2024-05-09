import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropDownButton from 'react-bootstrap/DropdownButton';
import LanguageOption from './LanguageOption';

const LanguageDropdown = ({ dropdownID, className, size, languages, selectedLang, setSelectedLang }) => {

  return (
    <DropDownButton id={dropdownID} variant='secondary' size={size}
                    align={{lg: 'start'}} as={ButtonGroup} className={className}
                    title={languages.find(language => language.code === selectedLang).name}>
        {languages.map((language) => (
            <LanguageOption
            key={language.id}
            id={language.id}
            name={language.name}
            code={language.code}
            setSelectedLang={setSelectedLang}
            />
        ))}
    </DropDownButton>
  )
}

export default LanguageDropdown