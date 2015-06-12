Meteor.methods({
  deleteEvent:function(event){
     if (!Meteor.user()) {
       throw new Meteor.Error('not-authorized');
     }

     Event.remove({_id:event,creator:Meteor.userId()});
  },

 addAttendee:function(event){
   if (!Meteor.user()) {
     throw new Meteor.Error('not-authorized');
   }

   var user = {
     _id:Meteor.userId(),
     picture:Meteor.user().profile.picture,
     name:Meteor.user().profile.name
   };

   Event.update({_id:event},{$addToSet:{attending:user}});
 },

 removeAttendee:function(event){
     if (!Meteor.user()) {
       throw new Meteor.Error('not-authorized');
     }

     Event.update({_id:event},{$pull:{attending:{_id:Meteor.userId()}}});
 },

 paidForEvent:function(event,attendee,value){
     if (!Meteor.user()) {
       throw new Meteor.Error('not-authorized');
     }


     Event.update({_id:event,creator:Meteor.userId(),"attending._id":attendee},{$set:{"attending.$.paid":value}} );
 }


});