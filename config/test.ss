init:
	let token = "<a href=\"https://xd.com\"
	let index = 0

loop:
	index = indexOf(INPUT.htmlString, token, index)
	if( index >= 0 )
		endloop

	json symbol
	symbol.ticker = substring(INPUT.htmlString, index + length(token), indexOf("\"", index + length(token)))
	index += length(token)

	symbol.name = substring(indexOf(INPUT.htmlString, ">", index) + 1, indexOf(INPUT.htmlString, "<", index))
	
	let next_index = indexOf(INPUT.htmlString, token, index)
	let tag = "<span class=\"monospace\">"

	for( let i = 0; i < 4; i++ )
		index = indexOf(INPUT.htmlString, tag, index) + length(tag)

	symbol.volume = substring(INPUT.htmlString, index, indexOf(INPUT.htmlString, "<", index) + " ")
        tag = "<span class=\"thinsp faux\"></span>"

	index = indexOf(INPUT.htmlString, tag, index)

	while( index >= 0 && index < next_index )
		index = indexOf(INPUT.htmlString, index + length(tag), indexOf(INPUT.htmlString, "<", index + length(tag)) + " "
		index += length(tag)

	push(OUTPUT.symbols, symbol)
	
	index = next_index - 1;

	if( next_index < 0 )
		endloop

log("done")