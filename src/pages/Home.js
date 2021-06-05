import React from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import CategoryList from '../components/category/CategoryList'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'
import SubList from '../components/sub/SubList'
const Home = () => {



    return (

        <div>
            <div className="jumbotron text-danger font-weight-bold h1 text-center">
                <Jumbotron text={['Letest Products', 'New Arraival', 'Best seller']} />
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold jumbotron">
                New Arraival
            </h4>

            <NewArrivals />
            <br />



            <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold jumbotron">
                Best Sellers </h4>

            <BestSellers />
            <br />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold jumbotron">
                Categories </h4>
            <CategoryList />


            <br />
            <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold jumbotron">
                Sub Categories </h4>
            <SubList />


            <br />

        </div>


    )
}

export default Home
