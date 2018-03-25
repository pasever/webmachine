

export const UserDataForm = ({errors, text, user, onSubmit, updateFormField }) => (
                        <div className="jumbotron">
                        <h2>{ !text.mainTitle  ? "" : text.mainTitle }</h2>
                        <p>{ !text.body ? "" : text.mainBody }</p>
                    </div>0
                    <form onSubmit={ onSubmit }>
                        <Input value={ user.name } 
                            name="name" onChange={ updateFormField } 
                            displayName="Name" type="text" errorText={ errors.name } />
                        
                        <TextArea 
                            value={ user.description } name="description"
                            onChange={ updateFormField } displayName="Description"
                            cols={10} rows={3} errorText={ errors.description } 
                            byline="Just a short description of your organization" />
                        
                        <Input value={ user.contact } 
                            name="contact" onChange={ updateFormField }
                            displayName="Contact" type="text" errorText={ errors.contact } placeholder="Contact" />
                        
                        <Input value={ user.sms } name="sms" onChange={ updateFormField } 
                            displayName="SMS Phone #" type="text"
                            errorText={ errors.sms } placeholder="5555555555" maskPhone={true} />
                        
                        <Input value={ user.web } name="web" errorText={ errors.web } placeholder="Web"
                            displayName="Web URL" type="text" onChange={ updateFormField } />
                        
                        <Input value={ user.db } name="db" errorText={ errors.db } placeholder="Database Name"
                            displayName="Database Name" type="text" onChange={ updateFormField } />
    
                        <Input value={ user.uri } name="uri" errorText={ errors.uri } placeholder="db.example.net"
                            displayName="Database URI" type="text" byline="Do not include your username and password" 
                            onChange={ updateFormField } />
                        
                        <Input value={ user.username } name="username" errorText={ errors.username } placeholder="username"
                            displayName="Database Username" type="text" onChange={ updateFormField } />
    
                        <Input value={ user.password } name="password" errorText={ errors.password } placeholder=""
                            displayName="Database Password" type="password" onChange={ updateFormField } />
    
                        <Button type="submit"  text="Sign Up" style="default" name="signup" />
                    </form>
