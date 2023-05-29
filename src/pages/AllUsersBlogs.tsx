import { useEffect, useState } from "react"
import Blog from "../components/Blog"
import axios from "axios"

const AllUsersBlogs = () => {
    const [blogsList, setBlogsList] = useState([{
        userId: "615c6b4d354d123456789abc", // ObjectId referencing a user
        title: "Sample Blog Post 1",
        content: "This is the content of the first blog post.",
        category: "Technology",
        author: "John Doe",
      },
      {
        userId: "615c6b4d354d123456789def", // ObjectId referencing a user
        title: "Sample Blog Post 2",
        content: "This is the content of the second blog post.",
        category: "Food",
        author: "Jane Smith",
      },
      {
        userId: "615c6b4d354d123456789ghi", // ObjectId referencing a user
        title: "Sample Blog Post 3",
        content: "This is the content of the third blog post.",
        category: "Travel",
        author: "Mark Johnson",
      },])

    useEffect(() => {
        axios.get('http://localhost:3000/blogs-all-user')
             .then((res) => {setBlogsList(res.data)})
             .catch((err) => {console.log(err)})
    }, [])

    // const list = blogsList.length === 0 ? console.log("Empty list") : blogsList.map(b => (<Blog {...b}/>))

    return (
        <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="w-full flex-grow pt-1 px-3 grid gap-8 lg:grid-rows-3">
            {blogsList.map(b => (<Blog {...b}/>))}
            </div>
            {/* <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
                <div className="flex sm:flex-col px-2">
                <Blog />
                </div>
            </div> */}
        </div>
    )
}

export default AllUsersBlogs