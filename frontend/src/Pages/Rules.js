import React from "react";
import styled from "styled-components";

export default function Rules() {
	return <RulesStyle>
		<h2>Here are some rules you should abide to maintain healthy environment</h2>
		<ul>
			<li>Do not post corrupt tasks (tasks willingly made to be wrong), the question should be meaningful with fairly straightforward possible answers.</li>
			<li>Before posting a task, double check if the given correct answer is actually correct.</li>
			<li>Do not falsely report other tasks.</li>
			<li>A username should not contain profanity.</li>
			<li>Tasks can`t have profanity in their formulation or answers.</li>
			<li>Uploaded content should have appropriate tags applied to them.</li>
			<li>Uploaded theory has to be factually accurate.</li>
			<li>Uploaded task content should have a fitting difficulty level applied.</li>
			<li>Uploaded content can not violate the intellectual rights of others.</li>
			<li>Uploaded content can not be hateful, racially or ethnically offensive.</li>
			<li>Uploaded content can not promote behavior that would be considered to be a criminal offense. </li>
			<li>Uploaded campaign content should have theory that matches the tasks of the campaign.</li>
			<li>Uploaded campaign tasks should be accomplishable with given theory.</li>
			<li>Comments on tasks have to be meaningful.</li>
			<li>Comments to other users should be related to the content they uploaded.</li>
			<li>Do not re-upload tasks that have already been uploaded.</li>
			<li>Users can not use software that would damage the website.</li>
			<li>Users can not probe, scan or test the vulnerabilities of the website.</li>
			<li>Users can not breach the security of the website.</li>
			<li>Users can not use software that would trace any information about other users.</li>
		</ul>


		<h2>To gain permissions to post a task you first need to gain sufficient level and fulfill these requirements</h2>
		<ul>
			<li>Solve X amount of tasks</li>
			<li>Solve Y amount of tasks in each difficulty level</li>
		</ul>
	</RulesStyle>;
}

const RulesStyle = styled.div`
	padding-top: var(--page-top-offset);
	margin: 0 50px;
	// Style | here | if we want any
	//       V      V
	h2 {

	}
	ul {
		li {

		}
	}
`;