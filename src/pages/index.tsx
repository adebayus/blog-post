import Layout from './layout/layout'
import { ITab } from '../types/types'
import { useContext, useState } from 'react';
import PostBLog from '../components/post-blog';
import { BlogContext } from '@/store';
import { stat } from 'fs';


export default function Home() {

	const { state, dispatch } = useContext(BlogContext);

	console.log(state, dispatch,"dasdasdas")

	const tabsList: ITab[] = [
		{
			id: 1,
			title: "Blog Post"
		},
		{
			id: 2,
			title: "Users List"
		}
	]

	const [selectedTab, SetSelectedTab] = useState<number>(1)

	const handleSelectedTab = (id: number) => {
		SetSelectedTab(id)
	}

	return (
		<Layout
			tabsList={tabsList}
			selectedTab={selectedTab}
			setSelectedTab={handleSelectedTab}
		>
			<div>
				<PostBLog />
			</div>
		</Layout>
	)
}
