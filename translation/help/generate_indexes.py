# coding: utf-8

# Libraries
from bs4 import BeautifulSoup
import os

# constants
APPS_PATH = "..\\..\\apps\\"
HELP_PATH = "\\main\\resources\\help\\"
INDEX_PATH = "search\\indexes.js"
sections = ["HelpfulHints", "ProgramInterface", "UsageInstructions"]
editors = ["documenteditor", "presentationeditor", "spreadsheeteditor"]


def internal_paths(path, isfile = True):
    for name in os.listdir(path):    
        if (isfile and os.path.isfile(os.path.join(path, name)) and name.endswith('.htm')) or (isfile != True and os.path.isdir(os.path.join(path, name))):
            yield name


def one_space(str):
    str = str.replace('\t', ' ')
    while '  ' in str:
        str = str.replace('  ', ' ')
    return str  


# create object for page htm
def page_object(pathLeng, file_path):
    HTMLFile = open(pathLeng + file_path, "r", encoding="utf-8")
    # Reading the file
    page = HTMLFile.read()
    # Creating a BeautifulSoup object and specifying the parser
    soup = BeautifulSoup(page, 'lxml')
    body = soup.div.text.strip()
    str = '\n\t{\n\t\t"id": "' + file_path    
    str = str + '",\n\t\t"title": "' + soup.title.text
    str = str + '",\n\t\t"body": "' + one_space(body.replace('\n', '').replace('\\', '\\\\').replace('"', '\\\"')) 
    str = str + '"\n\t},'
    return str


# editors
for editor in editors:
    editor_help_path = APPS_PATH + editor + HELP_PATH
    print('Creating files indexes.js for', editor, '\n')
    # languages
    for leng in internal_paths(editor_help_path, False):  
        if leng == "images":
            continue
        print('\tStart for ', leng)
        leng_path = editor_help_path + leng + "\\"
        fl = open(leng_path + INDEX_PATH, "w", encoding="utf-8")
        strIndexes = 'var indexes = \n['
        # sections
        for section in sections:
            for file in internal_paths(leng_path + section):
                fl.write(strIndexes)
                strIndexes = page_object(leng_path, section + "/" + file)

        strIndexes = strIndexes[:-1] + '\n]'
        fl.write(strIndexes)
        fl.close()
        print('\tDone!\n')
print('Finish!')
