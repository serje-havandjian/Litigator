Case.destroy_all
Trigger.destroy_all
Deadline.destroy_all
MilestonesForDemurrer.destroy_all
MilestonesForAnswer.destroy_all
MilestonesIfDemurrerDelay.destroy_all

# Cases
miller = Case.create(name: "Miller v. Flatiron Financial Services", counsel: "Serje P. Havandjian, Esq.", date_case_filed:"2022-07-15", date_complaint_served:"2022-07-18", user_id: 1)
smith = Case.create(name: "Smith v. Flatiron Financial Services", counsel: "Serje P. Havandjian, Esq.", date_case_filed:"2022-07-15", date_complaint_served: "2022-07-18", user_id: 1)
johnson = Case.create(name: "Johnson v. Flatirn Financial Services", counsel: "Serje P. Havandjian, Esq.", date_case_filed:"2022-07-15", date_complaint_served: "2022-07-18", user_id: 1)


#Triggers
miller_complaint = Trigger.create(title: "Complaint Served", date_served: "2022-07-18", method_of_service: "Personal Service/Hand")
# miller_discovery = Trigger.create(title: "Form Interrogatory Served", date_served: "2022-07-25", method_of_service: "Mail")

# Deadlines
miller_complaint_answer_deadline = Deadline.create(title: "Answer Complaint", deadline: "2022-08-17", case_id: miller.id, trigger_id: miller_complaint.id)
miller_complaint_demurrer_deadline = Deadline.create(title: "Demur to Complaint", deadline: "2022-08-17", case_id: miller.id, trigger_id: miller_complaint.id)
# miller_discovery_deadline = Deadline.create(title: "Form Interrogatory Response Due", deadline: "2022-08-29", case_id:miller.id, trigger_id:miller_discovery.id)

# Milestones
milestonesForMillerDemurrer = MilestonesForDemurrer.create(m1: "Analyze Complaint", m2: "Begin Drafting Demurrer", m3: "Provide Draft Demurrer to Partner", m4: "Provide Draft Demurrer to Client", m5: "Meet and Confer With Opposing Counsel", m6: "Draft Client Declaration, Counsel Declaration, Potential Request for Judicial Notice, and Proposed Order", m7: "Finalize Demurrer & Related Documents for File and Service", m8: "File and Serve Demurrer Tomorrow", deadline_id: miller_complaint_demurrer_deadline.id)

milestonesForMillerAnswer = MilestonesForAnswer.create(m1: "Analyze Complaint", m2: "Draft Answer (NOTE: If Complaint Verified, Answer Each Paragraph In Complaint Specifically)", m3: "Provide Draft To Partner", m4: "File and Serve Answer Tomorrow", deadline_id: miller_complaint_answer_deadline.id)

milestonesIfMillerDemurrerDelay = MilestonesIfDemurrerDelay.create(m1: "NOTE: You are getting this warning because Milestones For Demurrer have not been met. Change in strategy!", m2: "Ask Opposing Counsel for a 30-day extension to Responsive Pleading Deadline.  Confirm extension in writing via e-mail and store for your records.", m3: "If Opposing Counsel does not grant extension, file an Answer on the Responsive Pleading Deadline, making avialable the option to file a Motion for Judgment on the Pleadings. Inform client that same arguments and theories for demurrer are avaialble in the form of a Motion for Judgment on the Pleadings, which can be drafted, filed, and served immediately.", m4: "Pray for forgiveness", deadline_id: miller_complaint_demurrer_deadline.id)

puts "Done Seeding!"