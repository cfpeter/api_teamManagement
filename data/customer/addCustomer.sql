
INSERT INTO [Customer].[Customer]
           (
            [CustomerTypeID]
           ,[PersonID] 
           ,[CreatedBy] 
           ,[UpdatedBy] 
           )
     VALUES
           (
            
            @customerTypeID
           ,@PersonID 
           ,@createrBy 
           ,@updatedBy 
           )

SELECT SCOPE_IDENTITY() AS id;