
INSERT INTO [Customer].[Person]
           (
            [FirstName]
           ,[LastName]
           ,[DOB]
           ,[Gender]
           ,[Email]
           ,[CellPhone]
           ,[OtherPhone]
           ,[CreatedBy] 
           ,[UpdatedBy] )
     VALUES
           (
            
            @firstName
           ,@lastName
           ,@DOB
           ,@gender
           ,@email
           ,@cellphone
           ,@otherPhone
           ,@createrBy 
           ,@updatedBy 
           )

-- Select * from [customer].[Person] WHERE personID = SCOPE_IDENTITY()
SELECT SCOPE_IDENTITY() AS id;