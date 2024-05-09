#from tensorflow as tf
from translate import Translator

MODELS = {
    'es-en': 'path/to/saved/es_en_model',
    'ko-en': 'path/to/saved/ko_en_model',
    'vi-en': 'path/to/saved/vi_en_model',
    'fr-en': 'path/to/saved/fr_en_model',
}

def load_translation_model(source_language, target_language):
    '''
    model_path = MODELS.get(f'{source_language}-{target_language}')
    if model_path:
        return tf.saved_model.load(model_path)
    return None
    '''

    translator = Translator(from_lang=source_language, to_lang=target_language)
    return translator