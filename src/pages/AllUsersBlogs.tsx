import { useEffect, useState } from "react"
import Blog from "../components/Blog"
import { ListAllBlogsApi } from "../api/ApiService"

const AllUsersBlogs = () => {
    const [blogsList, setBlogsList] = useState([])

    useEffect(() => {
        ListAllBlogsApi()
             .then((res) => {setBlogsList(res.data)})
             .catch((err) => {console.log(err)})
    }, [])

    // const list = blogsList.length === 0 ? console.log("Empty list") : blogsList.map(b => (<Blog {...b}/>))

    return (
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="w-full flex-grow pt-1 px-3 grid gap-8 lg:grid-rows">
            {blogsList.map(b => (<Blog {...b}/>))}
            </div>
        </div>
    )
}

export default AllUsersBlogs