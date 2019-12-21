// This module will make requests to the webserver
package requests

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

//GetExport is a global function to get the exported XML file from the wordpress erver
//It will make a GET request to the fixed url, and download the XML
//This is not called by an external API
func GetExport(url string) {
	response, responseErr := http.Get(url)

	if responseErr != nil {
		fmt.Println(responseErr)
	}
	defer response.Body.Close()

	//Create an emoty file
	file, fileErr := os.Create("./dummyfile.xml")
	if fileErr != nil {
		fmt.Println(fileErr)
	}
	defer file.Close()

	//Write the bytes to the empty file
	_, err := io.Copy(file, response.Body)
	if err != nil {
		fmt.Println(err)
	}

}
