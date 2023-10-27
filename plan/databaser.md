questions
    id(pk)
    title
    text

answers
    id(pk)
    text
    score

tags
    id(pk)
    name






    For å bruke tegne-program i VSCode, last ned UMLet, lag en fil med extension .uxf

    Vi må ha en felles database vi jobber mot, kan være hvem som helst sin.
    Så oppretter vi alle tabellene vi trenger i denne.


    Vi kommer til å trenge:
    User (bruker-informasjon)
    Question (informasjon om spørsmålet og alt som tilhører det kan upvotes og inneholde tags)
    Answer (svaret må svare på et eksisterende spørsmål og kan upvotes)
    Favourite (bruker kan sette et spørsmål som favoritt, ikke en kommentar.)
    Tags (her lagres alle tagsene som kan brukes i spørsmålene (kan bruker lage egne eller ha en pre-defined tag-liste?))
    Upvotes (en bruker kan upvote et spørsmål eller en kommentar)
    Comment (en kommentar til et eksisterende spørsmål fra samme bruker eller en annen, kan upvotes)


    Favourite_question (hvilket spørsmål om er lagret som favoritt)
    answer_comment (forholdet mellom spørsmål og kommentar)
    Tags_question_relation (for å lagre info om hvilke spørsmål som inneholder hvilke tags)
    Comment_upvote (relasjonen mellom en kommentar og en upvote)
