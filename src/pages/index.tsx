import Layout from './layout/layout'
import { ITab } from '../types/types'
import { useState } from 'react';
import PostBLog from '../components/post-blog';
import { render } from 'react-dom';
import UserPage from '@/components/user-page';

export default function Home() {
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

	const renderTab = () => { 
		return selectedTab == 1 ? <PostBLog /> : <UserPage />
	 } 

	return (
		<Layout
			tabsList={tabsList}
			selectedTab={selectedTab}
			setSelectedTab={handleSelectedTab}
		>
			<div> { renderTab() } </div>
		</Layout>
	)
}
