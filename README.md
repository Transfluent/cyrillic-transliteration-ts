# CyrTranslit
Bi-directional Cyrillic transliterator for Python. Transliterate Cyrillic text to Latin and vice versa.

By default, transliterates for the Serbian language but a language flag can be set in order to transliterate Macedonian and Montenegrin.

## What is transliteration?
Transliteration is the conversion of a text from one script to another. For instance, a Latin transliteration of the Serbian phrase "Република Косово", usually translated as "Republika Kosovo", is "Republika Kosovo".

## Usage
### List of supported languages
```python
>>> import cyrtranslit
>>> cyrtranslit.supported()
>>> ['me', 'sr', 'mk']
```
### From Cyrillic to Latin
#### Serbian
```python
>>> import cyrtranslit
>>> cyrtranslit.to_latin("Република Косово")
>>> "Republika Kosovo"
```
#### Macedonian
```python
>>> import cyrtranslit
>>> cyrtranslit.to_latin("Република Косово", "mk")
>>> "Republika Kosovo"
```
#### Montenegrin
```python
>>> import cyrtranslit
>>> cyrtranslit.to_latin("Република Косово", "me")
>>> "Republika Kosovo"
```
### From Latin to Cyrillic
#### Serbian
```python
>>> import cyrtranslit
>>> cyrtranslit.to_cyrillic("Republika Kosovo")
>>> "Република Косово"
```
#### Macedonian
```python
>>> import cyrtranslit
>>> cyrtranslit.to_cyrillic("Republika Kosovo", "mk")
>>> "Република Косово"
```
#### Montenegrin
```python
>>> import cyrtranslit
>>> cyrtranslit.to_cyrillic("Republika Kosovo", "me")
>>> "Република Косово"
```

### Contribute a new Cyrillic alphabet
Simply create a new transliteration dictionary in the **\_\_init\_\_.py** file and reference to it in the _**TRANSLIT\_DICT**_ dictionary.

Consider contributing support for the following Cyrillic alphabets:
- Bulgarian
- Russian
- Ukranian
