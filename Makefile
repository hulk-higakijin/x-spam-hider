zip:
	zip -r x-spam-hider.zip manifest.json content.js .babelrc package.json -x "*.git*" "node_modules/*" "test/*"