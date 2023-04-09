function hello({ data }: any) {

    // Handles the submit event on form submit.
    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            title: event.target.title.value,
            description: event.target.description.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/form/'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Is this your full name: ${result.title}`)
        console.log(result);
    }
    return <div>
        {data[0].title}<br />
        {data[0].description}<br />
        <form onSubmit={handleSubmit}>
            <label >title:</label>
            <input type="text" id="first" name="title" />
            <label >description:</label>
            <input type="text" id="last" name="description" />
            <button type="submit">Submit</button>
        </form>
    </div>;
}

// This gets called on every request
export async function getStaticProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/tasks`)
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
}

export default hello;