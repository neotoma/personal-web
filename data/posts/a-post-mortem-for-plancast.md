<em>This post was originally <a href="http://techcrunch.com/2012/01/22/post-mortem-for-plancast/">published on TechCrunch</a> in January 2012.</em>

<p>Nearly three years ago, <a href="http://techcrunch.com/2009/03/10/hendrickson-were-gonna-miss-you/">I left my position at TechCrunch</a> to start my own Internet business, with the idea of creating a web application that’d help people get together in real-life rather than simply helping them connect online as most social networking applications had done.</p>

<p>Plancast was the service conceived a few months later from that basic inclination. Its approach was to provide a really easy way for people to take whatever interesting plans they had in their calendars and share them openly with friends, with the rationale that greater social transparency for this particular type of personal information would facilitate serendipitous get-togethers and enable a greater awareness of relevant events. Personally, I figured that knowing more about the events my friends and peers were attending would lead to a more fulfilling social and professional life because I could join them or at least learn about how they spent their time around town.</p>

<p>Along the way my team built a minimum viable product, <a href="http://techcrunch.com/2009/11/30/plancast/">launched from obscurity here on TechCrunch</a>, <a href="http://techcrunch.com/2010/03/08/plancast-funding/">raised a seed round of funding</a> from local venture capitalists and angel investors, and worked like mad to translate our initial success into long-term growth, engagement and monetization.</p>

<p>Alas, our efforts began to stall after several months post-launch, and we were never able to scale beyond a small early adopter community and into critical, mainstream usage. While the initial launch and traction proved extremely exciting, it misled us into believing there was a larger market ready to adopt our product. Over the subsequent year and a half, we struggled to refine the product’s purpose and bolster its central value proposition with better functionality and design, but we were ultimately unable to make it work (with user registration growth and engagement being our two main high-level metrics).</p>

<p>This post-mortem is an attempt to describe the fundamental flaws in our product model and, in particular, the difficulties presented by events as a content type. It’s my hope that other product designers can learn a thing or two from our experience, especially if they are designing services that rely on user-generated content. The challenges I describe here apply directly to events, but they can be used collectively as a case study to advance one’s thinking about other content types as well, since all types demand serious analysis along these lines should one seek to design a network that facilitates their exchange.</p>

<h4>Sharing Frequency</h4>
<p>Social networks (by my general definition and among which I count Plancast) are essentially systems for distributing <a href="http://markmhendrickson.com/content">content</a> among people who care about each other, and <a href="http://markmhendrickson.com/share-frequency">the frequency</a> at which its users can share that content on a particular network is critical to how much value it’ll provide them on an ongoing basis.</p>

<p>Unlike other, more frequent content types such as status updates and photos (which can be shared numerous times per day), plans are suitable for only occasional sharing. Most people simply don’t go to that many events, and of those they do attend, many are not anticipated with a high degree of certainty. As a result, users don’t tend to develop a strong daily or weekly habit of contributing content. And the content that does accrue through spontaneous submissions and aggregation from other services is too small to provide most users with a repeatedly compelling experience discovering events.</p>

<p>I run the service, and even I currently have only five upcoming plans listed on my profile, with a total of 500 plans shared over the last couple of years, in contrast to almost 2,800 tweets on Twitter over the same period of time. People often tell me “I like Plancast, but I never have any plans to share”. With social networks, this is sometimes a case of self-awareness (such as when people say they don’t know what to tweet), but often they’re simply telling the truth; many Plancast users don’t have any interesting plans on their calendars.</p>

<h4>Consumption Frequency</h4>
<p>People also don’t proactively seek out events to attend as you might suppose. I’ve gotten into the habit of thinking about people as divided into two camps: those who have lots of free time and those who don’t.</p>

<p>Those who do are often proactive about filling it, in part by seeking out interesting events to attend in advance. They are generally more inquisitive about social opportunities, and they will take concrete steps to discover new opportunities and evaluate them.</p>

<p>Those who don’t have much free time often desire to conserve it, so rather than seeking out or welcoming additional opportunities, they view them as mentally taxing impositions on a limited resource. For them, planning is a higher-risk endeavor, and usually they’d rather not plan anything at all, since if they’re busy, they likely have a preference to keep their free time just that – free.</p>

<p>It’s hard to generalize by saying most people are in one camp or the other, but suffice to say, there are many people in the latter. And for them, it’s hard to get them excited about a service that will give them more options on how to use their time.</p>

<h4>Tendency to Procrastinate</h4>
<p>Even putting this bifurcation aside, most people resist making advanced commitments before they absolutely need to make them. People fear missing out on worthwhile events but don’t actually like to take the deliberate initiative to avoid such missed chances, which requires planning.</p>

<p>This can be attributed primarily to people’s desire to keep their options open in case other conflicting opportunities emerge as the date and time of an event approaches. If they can afford to wait and see, they will. Therefore, their commitment will be secured and shared in advance only when they’re particularly confident they’ll attend an event, if they need to reserve a spot before it fills up, or if there’s some other similar prerogative.</p>

<h4>Incentives to Share</h4>
<p>Returning to the topic of sharing plans, it’s not only a matter of having interesting plans to share but being compelled to actually share them. And unfortunately, people don’t submit information to social networks because they love data set integrity or altruistically believe in giving as much as possible. They do it because the act of contribution selfishly results in something for them in return.</p>

<p>Most social networks feed primarily on vanity, in that they allow people to share and tailor online content that makes them look good. They can help people communicate to others that they’ve attended impressive schools, built amazing careers, attended cool parties, dated attractive people, thought deep thoughts, or reared cute kids. The top-level goal for most people is to convince others they are the individuals they want to be, whether that includes being happy, attractive, smart, fun or anything else.</p>

<p>This vanity compels folks to share content about themselves (or things they’ve encountered) most strongly when there’s an audience ready and able to generate validating feedback. When you post a clever photo on Instagram, you’re telling the world “I’m creative!” and sharing evidence to boot. Those who follow you validate that expression by liking the photo and commenting positively about it. The psychological rush of first posting the photo and then receiving positive feedback drives you to post more photos in the hope of subsequent highs.</p>

<p>Sharing plans, unfortunately, doesn’t present the same opportunity to show off and incur the same subsequent happy feelings. Some plans are suitable for widespread consumption and can make a person look good, such as attending an awesome concert or savvy conference. But, frustratingly, the vainest events are exclusive and not appropriate for sharing with others, especially in detail.</p>

<p>The feedback mechanisms aren’t nearly as potent either, since coming up with a worthy comment for an event is harder than commenting on a photo, and “liking” a plan is confusing when there’s also an option to join. The positive feedback of having friends join is itself unlikely since those friends have considerations to make before they can commit, and they’ll tend to defer that commitment for practical purposes, per above.</p>

<p>Additionally, if a user wants to show off the fact they’re at a cool event, there is little additional benefit to doing so before the event rather than simply tweeting or posting photos about it while at the event. An important exception is to be made for professionals who style themselves as influencers and want to be instrumental parts of how their peers discover events. This exception has indeed been responsible for much of our attendee-contributed event data among an early-adopter community of technology professionals.</p>

<h4>Selectivity & Privacy Concerns</h4>
<p>Vanity, of course, is not the only possible incentive for users to share their plans. There’s also utility to getting others to join you for an event you’ll be attending, but this turns out to be a weak incentive for broadcasting since most people prefer to be rather picky about who they solicit to join them for real-life encounters.</p>

<p>While event promoters have a financial interest in attracting attendees far and wide, the attendees themselves mainly turn to their closer circle of friends and reach out to them individually. You don’t see a lot of longer-tail plans in particular (such as nights out on the town and trips) because people are both wary of party crashers and usually uninterested in sourcing participants from a wide network.</p>

<h4>The Importance of an Invitation</h4>
<p>On the flip-side of this reluctance to share plans far and wide is the psychological need for people to get personally invited to events.</p>

<p>Plancast and other social event sharing applications are rooted in an idealistic notion that people would feel confident inviting themselves to their friends’ events if only they knew about them. But the informational need here is not only one of event details (such as what’s going to happen, when, where and with whom). People often also need to know through a personal invitation that at least one friend wants them to join.</p>

<p>When you have a service that helps spread personal event information but doesn’t concurrently satisfy that need, you have a situation where many people feel awkwardly aware of events to which they don’t feel welcome. As a result, the most engaging events on Plancast are those that are open in principle and don’t solicit attendees primarily through invitations, such as conferences and concerts, where the attendance of one’s friends and peers is a much less important consideration for their own.</p>

<h4>Content Lifespan</h4>
<p>Getting content into a social network is not enough to ensure its adequate value; there’s also an importance of preserving that content’s value over time, especially if it just trickles in.</p>

<p>Unfortunately, plans don’t have a long shelf life. Before an event transpires, a user’s plan for it provides social value by notifying others of the opportunity. But afterwards, its value to the network drops precipitously to virtually nothing. And since most users don’t have enough confidence to share most plans more than one or two weeks in advance, plans are typically rendered useless after that length of time.</p>

<p>Contrast this expiration tendency with more “evergreen” content types, such as profiles and photos. Other people can get value out of your Facebook profile for years after you set it up, and the photos you posted in college appear to have even increased in value. Nostalgia doesn’t even have to play a part; people’s hearts will melt upon viewing <a href="http://pinterest.com/pin/62065301084425706/">this puppy</a> on Pinterest, Tumblr, and other visually-heavy content networks for a long time to come. But how much do you care that <a href="http://plancast.com/p/7crb/october-2011-ny-tech-meetup">I attended a tech meetup</a> in New York last October, even if you’re my friend?</p>

<h4>Geographic Limitations</h4>
<p>Geographic specificity is another inherent limitation to a plan’s value. Unlike virtually all other content types (with the exception of check-ins), plans provide most of their value to others when those users live or can travel near enough to join.</p>

<p>I may share plans for a ton of great events in San Francisco, but few to none of my friends who live outside of the Bay Area are going to care. In fact, they’ll find it annoying to witness something they’ll miss out on. Sure, they might appreciate simply knowing what I’m up to, but the value to that kind of surveillance is rather modest all by itself.</p>

<p>This is especially problematic when trying to expand the service into new locations. New users will have a hard time finding enough local friends who are either on the service and sharing their plans already, or those who are willing to join them on a new service upon invitation. People who encounter the service from non-urban locations have the hardest time, since there aren’t many events going on in their area in general, let alone posted to Plancast. Trying to view all events simply listed within their location or categories of interest yields little for them to enjoy.</p>

<h4>Looking Forward</h4>
<p>Despite all of these challenges, I still believe someone will eventually figure out how to make and market a viable service that fulfills our aims, namely to help people share and discover events more socially. There’s simply too much unearthed value to knowing about much of what our friends plan to do to leave information about it so restricted to personal calendars and individuals’ heads.</p>

<p>Another startup may come along that develops insight into an angle of attack we missed. Or, perhaps more likely, an established company with an existing event or calendaring product will progressively provide users with a greater ability to share their personal information contained within. On the calendaring side, Google is possibly the best-situated with Google Calendar and Google+, which together could make for a very seamless event sharing experience (one of the things we considered seriously for Plancast was deep personal calendar integration, but a sufficient platform for it simply wasn’t available). On the events side, companies like Eventbrite, Meetup and Facebook have services that are primarily compelling for event organizers but already contain useful data sets that could be leveraged to create their own social event discovery and sharing experiences for attendees.</p>

<p>Plancast managed to attract a niche audience of early adopters who found it to be among the most efficient ways to share and hear about events (thanks, users! you know who you are). Over 100,000 have registered and over 230,000 people visit each month, not to mention enjoy the event digests we send out by email each day. For that reason alone, and despite its growth challenges, we’re going to keep it up and running for as long as possible and are hopeful we’ll find it a home that can turn it into something bigger. It’s my expectation that one day mainstream society will take for granted the type of interpersonal sharing it currently enables for just this small community, and I look forward to seeing how technological advancements overcome the aforementioned challenges to get us there.</p>

<br />

<img src="http://tctechcrunch2011.files.wordpress.com/2012/01/plancast.jpg?w=640" style="width: 100%;" />