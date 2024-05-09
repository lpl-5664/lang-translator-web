import './TranslateComponent.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LanguageDropdown from './LanguageDropdown';

const TranslateComponent = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [sourceLang, setSourceLang] = useState('es');
  const [targetLang, setTargetLang] = useState('en');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/languages/')
        .then(response => {
            setLanguages(response.data);
        })
        .catch(error => {
            console.error('Error fetching languages: ', error)
        });
  }, []);

  const handleTranslate = () => {
    axios.post('http://127.0.0.1:8000/translator_app/', {
        source_language: sourceLang,
        target_language: targetLang,
        input_text: inputText
    })
    .then(response => {
        setTranslatedText(response.data.translated_text)
    })
    .catch(error => {
        console.error('Error:', error)
    })
  }

  const handleSwitchClick = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  }

  return (
    <div className="container-fluid text-center mt-lg-5 mt-3 h-75">
        <div className="d-none d-lg-block">
            <div className="row align-items-start justify-content-center text-start h-100 w-100">
                <div className="col-5 h-50">
                    <div className="d-flex flex-column h-100">
                        
                        <ButtonGroup size='lg'>
                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={'dropdown_src_lang'}
                                    className={'flex-shrink-1'}
                                    size={'lg'}
                                    languages={languages}
                                    selectedLang={sourceLang}
                                    setSelectedLang={setSourceLang} 
                                />
                            )}

                            <Button variant='secondary' className='dummy-btn flex-grow-1'>
                            </Button>

                            <Button id="switchBtn" variant='secondary' onClick={handleSwitchClick}>
                                <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                            </Button>
                        </ButtonGroup> 
                    
                        <Form.Control id='textInput' as="textarea" size='lg'
                            rows={3} className="text-start align-top h-75" 
                            value={inputText} onChange={e => setInputText(e.target.value)}>
                        </Form.Control>

                        <ButtonGroup size='lg' className='d-flex'>
                            <Button variant='light' className='bottom-dummy-btn flex-grow-1'>
                            </Button>

                            <Button id="translateBtn_md" variant='light'
                                size='lg' onClick={handleTranslate}>Translate</Button>
                        </ButtonGroup>
                        
                    </div>
                </div>

                <div className="col-5 h-50">
                    <div className="d-flex flex-column flex-column-custom h-100">

                        <ButtonGroup size='lg'>
                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={"dropdown_tgt_lang"}
                                    className={'flex-shrink-1'}
                                    size={'lg'}
                                    languages={languages}
                                    selectedLang={targetLang}
                                    setSelectedLang={setTargetLang}
                                />
                            )}

                            <Button variant='secondary' className='dummy-btn flex-grow-1'>
                            </Button>
                        </ButtonGroup>
                        
                        <Form.Control id="translationDisplay" as="textarea" size='lg'
                            rows={3} className="text-start align-top h-75" 
                            value={translatedText !== '' ? translatedText : "Translation"} 
                            readOnly>
                        </Form.Control>
                        

                        <Button variant='light' size='lg' className="toggleSW d-flex justify-content-end">
                            <Form.Check type="switch" id="cstmToggleSW" label="Custom"/>
                        </Button>

                    </div>
                </div>
            </div>
        </div>

        <div className="d-none d-md-block d-lg-none">
            <div className="row align-items-start justify-content-center text-start h-100 w-100">
                <div className="col-10 h-50">
                    <div className="cstm-btn-group d-flex align-self-center justify-content-center w-100">
                        <ButtonGroup className='d-flex flex-grow-1'>
                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={'dropdown_src_lang_md'}
                                    className={'flex-grow-1'}
                                    size={'lg'}
                                    languages={languages}
                                    selectedLang={sourceLang}
                                    setSelectedLang={setSourceLang} 
                                />
                            )}

                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={'dropdown_tgt_lang_md'}
                                    className={'flex-grow-1'}
                                    size={'lg'}
                                    languages={languages}
                                    selectedLang={targetLang}
                                    setSelectedLang={setTargetLang} 
                                />
                            )}
                        </ButtonGroup>
                    
                        <Button id='rndSWBtn' className='float-btn' variant='light' onClick={handleSwitchClick}>
                            <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                        </Button>
                    </div>

                    <Form.Control id='textInput_md' as="textarea" size='lg'
                        rows={3} className="text-start align-top h-75" 
                        value={inputText} onChange={e => setInputText(e.target.value)}>
                    </Form.Control>

                    <ButtonGroup size='lg' className='d-flex'>
                        <Button variant='light' className='bottom-dummy-btn flex-grow-1'>
                        </Button>

                        <Button id="translateBtn_md" variant='light'
                            size='lg' onClick={handleTranslate}>Translate</Button>
                    </ButtonGroup>
                </div>
            </div>
            
            <div className="row align-items-start justify-content-center text-start h-100 w-100 mt-2">
                <div className="col-10 h-50">
                    <div className="d-flex flex-column">
                        <Form.Control id="translationDisplay_md" as="textarea" size='lg'
                            rows={3} className="text-start align-top h-75" 
                            value={translatedText !== '' ? translatedText : "Translation"} 
                            readOnly>
                        </Form.Control>
                        

                        <Button variant='light' size='lg' className="toggleSW d-flex justify-content-end">
                            <Form.Check type="switch" id="cstmToggleSW_md" label="Custom"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="ctn-sm d-md-none w-100">
            <div className="row align-items-start justify-content-center text-start w-100">
                <div className="col-12 p-0">
                    <div className="cstm-btn-group-sm d-flex align-self-center justify-content-center w-100">
                        <ButtonGroup className='d-flex flex-grow-1'>
                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={'dropdown_src_lang_sm'}
                                    className={'flex-grow-1'}
                                    languages={languages}
                                    selectedLang={sourceLang}
                                    setSelectedLang={setSourceLang} 
                                />
                            )}
                            {languages.length > 0 && (
                                <LanguageDropdown
                                    dropdownID={'dropdown_tgt_lang_sm'}
                                    className={'flex-grow-1'}
                                    languages={languages}
                                    selectedLang={targetLang}
                                    setSelectedLang={setTargetLang} 
                                />
                            )}
                        </ButtonGroup>
                    
                        <Button id='rndSWBtn_sm' className='float-btn-sm' variant='light' size='sm' onClick={handleSwitchClick}>
                            <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row align-items-start justify-content-center text-start h-50 w-100">
                <div className="col-12 p-0 h-100">
                    <Form.Control id='textInput_sm' as="textarea"
                        rows={3} className="text-start align-top h-75" 
                        value={inputText} onChange={e => setInputText(e.target.value)}>
                    </Form.Control>

                    <div className="translateToolBar d-flex align-self-center justify-content-end w-100">
                        <ButtonGroup className='d-flex flex-grow-1'>
                            <Button variant='light' className='bottom-dummy-btn-sm flex-grow-1'></Button>
                        </ButtonGroup>
                        <Button id="translateBtn_sm" variant='light' onClick={handleTranslate}>
                            Translate <FontAwesomeIcon icon={faArrowRightLong} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row align-items-start justify-content-center text-start h-50 w-100">
                <div className="col-12 p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <Form.Control id="translationDisplay_sm" as="textarea"
                            rows={3} className="text-start align-top h-75" 
                            value={translatedText !== '' ? translatedText : "Translation"} 
                            readOnly>
                        </Form.Control>

                        <Button variant='light' className="toggleSW-sm d-flex justify-content-end">
                            <Form.Check type="switch" id="cstmToggleSW_sm" label="Custom"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TranslateComponent